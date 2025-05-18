import { useEffect, useState } from "react"
import { Calendar, dateFnsLocalizer, type ToolbarProps, type View } from "react-big-calendar"
import { startOfWeek, getDay, format, parse } from "date-fns"
import { enUS } from "date-fns/locale/en-US"
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import type { Exam, Response } from "@/interfaces"
import { fetchExamOrTests } from "@/services"

const locales = { "en-US": enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

type MyEvent = {
  title: string;
  start: Date;
  end: Date;
  desc: string;
  venue: string;
  type: string;
};


function expandSessionsToEvents(data: Exam[] | null): MyEvent[] {
  const events: MyEvent[] = [];

  data?.forEach((item) => {
    console.log(item)
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const current = new Date(start);

    while (current <= end) {


      events.push({
        title: `${item.course.courseCode} ${item.type === 'EXAM' ? 'Exam' : 'Test'}`,
        desc: item.description,
        venue: item.venue,
        start,
        end,
        type: item.type,
      });

      current.setDate(current.getDate() + 1);
    }
  });

  return events;
}



function CustomToolbar(toolbar: ToolbarProps<MyEvent, object>) {
  const goToBack = () => toolbar.onNavigate('PREV')
  const goToNext = () => toolbar.onNavigate('NEXT')
  const goToToday = () => toolbar.onNavigate('TODAY')
  const changeView = (view: View) => toolbar.onView(view)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={goToBack}>Prev</Button>
        <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
        <Button variant="outline" size="sm" onClick={goToNext}>Next</Button>
      </div>
      <h2 className="text-lg font-semibold">{toolbar.label}</h2>
      <div className="flex gap-2">
        {['month', 'week', 'day'].map((view) => (
          <Button
            key={view}
            variant={toolbar.view === view ? "default" : "outline"}
            size="sm"
            className="cursor-pointer"
            onClick={() => changeView(view as View)}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function ExamPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month')
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [data, setData] = useState<Exam[] | null>(null)

  useEffect(() => {
    const load = async () => {
      const timetable: Response<Exam[]> = await fetchExamOrTests()
      setData(timetable.data)
    }

    load()
  }, [])

  function handleNavigate(date: Date) {
    setCurrentDate(date)
  }

  function handleViewChange(view: View) {
    if (view === 'month' || view === 'week' || view === 'day') {
      setCurrentView(view)
    }
  }

  function handleSelectEvent(event: MyEvent) {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  function eventStyleGetter() {
    const style = {
      backgroundColor: "#000",
      borderRadius: '0.3rem',
      color: "white",
      padding: '2px 6px',
      border: 'none',
      display: 'block',
      fontSize: '0.875rem',
      cursor: 'pointer',
    }
    return { style }
  }

  const expandedEvents = expandSessionsToEvents(data);

  return (
    <>
      <div className="p-2 max-w-7xl mx-auto font-mono flex items-center justify-center min-h-[calc(100vh-250px)] px-4 py-6">
        <Calendar<MyEvent>
          localizer={localizer}
          events={expandedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, width: '100%' }}
          date={currentDate}
          onNavigate={handleNavigate}
          view={currentView}
          onView={handleViewChange}
          views={['month', 'week', 'day']}
          components={{
            toolbar: CustomToolbar,
          }}
          popup={true}
          className="rounded-lg shadow-lg overflow-hidden p-3"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {/* Modal dialog for event details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-xl shadow-xl p-6 bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle className="font-mono text-2xl font-bold text-black dark:text-white mb-2">
              {selectedEvent?.title} 
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 text-black dark:text-white">
                <div>
                  <span className="font-semibold font-mono">Start:</span>{" "}
                  {selectedEvent && (
                    <span className="ml-1 font-mono">{format(selectedEvent.start, 'PPP p')}</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold font-mono">End:</span>{" "}
                  {selectedEvent && (
                    <span className="ml-1 font-mono">{format(selectedEvent.end, 'PPP p')}</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold font-mono">Description:</span>{" "}
                  <span className="ml-1 font-mono">{selectedEvent?.desc}</span>
                </div>
                <div>
                  <span className="font-semibold font-mono">Venue:</span>{" "}
                  <span className="ml-1 font-mono">{selectedEvent?.venue}</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-6">
            <DialogClose asChild>
              <Button className="font-mono bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md shadow cursor-pointer">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
