import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const Quizzes = () => {
    return (
        <div className="min-h-[calc(100vh-300px)] flex items-center justify-center px-4 py-16">
            <motion.div
                {...fadeInUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-2xl"
            >
                <Card className="shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-md">
                    <CardHeader className="pb-2 border-b border-gray-200">
                        <CardTitle className="flex items-center gap-3 font-mono text-4xl text-primary font-extrabold tracking-tight">
                            <span className="animate-bounce">📝</span>
                            Quizzes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.p
                            className="text-muted-foreground text-lg mb-10 mt-6 text-center leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Quizzes help you test your knowledge, reinforce learning, and track your progress. Stay tuned for interactive challenges designed to boost your skills!
                        </motion.p>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: 0.5,
                                type: "spring",
                                stiffness: 180,
                                damping: 18,
                            }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.12, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.2,
                                    ease: "easeInOut",
                                }}
                                className="text-lg text-center text-6xl font-mono font-black mb-6 drop-shadow-lg text-gray-700"
                            >
                                COMING SOON
                            </motion.div>
                            <Button
                                variant="outline"
                                disabled
                                className="mb-2 w-40 border-dashed border-2 border-primary text-primary bg-white/60"
                            >
                                Stay Tuned
                            </Button>
                            <Button
                                variant="secondary"
                                className="mt-3 w-40 bg-black text-white font-semibold shadow-md hover:bg-black/90"
                                asChild
                            >
                                <a href="/">Go Home</a>
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Quizzes;