import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const ChatBot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async (e) => {
		e.preventDefault();
		
		if (!inputMessage.trim()) return;

		const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
		setMessages(newMessages);
		setInputMessage('');
		setIsLoading(true);

		try {
			const response = await fetch('http://localhost:8000/api/v1/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: inputMessage }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to get response');
			}

			const data = await response.json();
			
			if (data.success && data.response) {
				setMessages([...newMessages, { text: data.response, sender: 'bot' }]);
			} else {
				throw new Error('Invalid response format');
			}

		} catch (error) {
			console.error('Chat Error:', error);
			setMessages([
				...newMessages,
				{ 
					text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.", 
					sender: 'bot' 
				}
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
			>
				{isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
			</button>

			{isOpen && (
				<div className="fixed bottom-20 right-4 w-80 bg-richblack-800 rounded-lg shadow-lg z-50">
					<div className="p-4 border-b border-richblack-700 flex justify-between items-center">
						<h3 className="text-white font-semibold">StudyForge AI Assistant</h3>
						<button
							onClick={() => setIsOpen(false)}
							className="text-white hover:text-gray-300"
						>
							<FaTimes />
						</button>
					</div>
					
					<div className="h-96 overflow-y-auto p-4">
						{messages.length === 0 && (
							<div className="text-center text-richblack-300">
								<p>👋 Hi! How can I help you today?</p>
							</div>
						)}
						{messages.map((message, index) => (
							<div
								key={index}
								className={`mb-4 ${
									message.sender === 'user' ? 'text-right' : 'text-left'
								}`}
							>
								<div
									className={`inline-block p-2 rounded-lg ${
										message.sender === 'user'
											? 'bg-blue-600 text-white'
											: 'bg-richblack-700 text-white'
									}`}
								>
									{message.text}
								</div>
							</div>
						))}
						{isLoading && (
							<div className="text-center text-white">
								<div className="flex items-center justify-center space-x-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
									<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
								</div>
							</div>
						)}
					</div>

					<form onSubmit={handleSendMessage} className="p-4 border-t border-richblack-700">
						<div className="flex gap-2">
							<input
								type="text"
								value={inputMessage}
								onChange={(e) => setInputMessage(e.target.value)}
								placeholder="Type your message..."
								className="flex-1 p-2 rounded bg-richblack-700 text-white focus:outline-none"
								disabled={isLoading}
							/>
							<button
								type="submit"
								className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300 ${
									isLoading ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								disabled={isLoading}
							>
								Send
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default ChatBot;