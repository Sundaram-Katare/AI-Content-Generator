import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import "@fontsource/space-grotesk"; // Use this class: `font-space-grotesk`

function PunchLine() {
    const [title, setTitle] = useState("");
    const [inputText, setInputText] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const [trialCount, setTrialCount] = useState(() => {
        const count = localStorage.getItem("trialCount");
        return count ? parseInt(count) : 0;
    });

    const [apiKey, setApiKey] = useState(() => {
        return localStorage.getItem('gemini_api_key') || '';
    });

    const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
    const [tempApiKey, setTempApiKey] = useState('');

    const backendUrl = "https://ai-content-generator-server-b923.onrender.com";

    useEffect(() => {
        axios
            .get(`${backendUrl}/api/content`)
            .then((res) => setHistory(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !inputText) {
            toast.error("Please fill all fields");
            return;
        }

        if (!apiKey && trialCount >= 3) {
            setShowApiKeyPrompt(true);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${backendUrl}/api/content/generate`, {
                title,
                inputText,
                apiKey: apiKey || null,
            });

            setGeneratedText(res.data.generatedText);

            setHistory([
                {
                    _id: res.data.id,
                    title,
                    inputText,
                    generatedText: res.data.generatedText,
                    createdAt: new Date(),
                },
                ...history,
            ]);

            if (!apiKey) {
                const newCount = trialCount + 1;
                setTrialCount(newCount);
                localStorage.setItem('trialCount', newCount.toString());
            }

            setTitle("");
            setInputText("");
        } catch (error) {
            toast.error("Error generating content");
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-center min-h-screen px-4 py-0 sm:py-12"
        >
            <h1 className="text-white text-4xl md:text-5xl font-semibold font-space-grotesk text-center mb-4">
                Create Smarter,<br /> Write Faster
            </h1>
            <p className="text-center font-ancizarSans text-white max-w-xl mb-8">
                AI-powered content generation for marketers, creators, and businesses.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-lg mb-6 font-ancizarSans space-y-4 md:max-w-xl">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Enter text to generate content"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={5}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded text-white text-lg font-medium ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-red-700"
                        }`}
                >
                    {loading ? "Generating..." : "Generate Content"}
                </button>
            </form>

            {generatedText && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-xl bg-gray-100 border border-gray-300 p-4 rounded shadow"
                >
                    <h3 className="font-semibold mb-2 text-lg">Generated Content:</h3>
                    <p className="whitespace-pre-wrap text-gray-800">{generatedText}</p>
                </motion.div>
            )}

            {showApiKeyPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
                    >
                        <h2 className="text-lg font-semibold mb-2">Enter your Gemini API Key</h2>
                        <p className="text-sm mb-3 text-gray-600">
                            You’ve used 3 free trials. Please enter your own Gemini API key to continue.
                        </p>
                        <input
                            type="text"
                            value={tempApiKey}
                            onChange={(e) => setTempApiKey(e.target.value)}
                            placeholder="Paste your Gemini API key here"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowApiKeyPrompt(false)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setApiKey(tempApiKey);
                                    localStorage.setItem('gemini_api_key', tempApiKey);
                                    setShowApiKeyPrompt(false);
                                    toast.success("API Key saved successfully");
                                }}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Save & Continue
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default PunchLine;
