import React, { useState } from 'react';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [sortBy, setSortBy] = useState('Relevance');

    const [researchIdeas, setResearchIdeas] = useState([
        { id: 1, topic: 'Computer Science', title: 'Idea 1', author: 'Author 1', tags: ['AI', 'NLP'], time: '2023-05-15', popularity: 8 },
        { id: 2, topic: 'Biology', title: 'Idea 2', author: 'Author 2', tags: ['Genetics', 'Cell Biology'], time: '2023-03-20', popularity: 5 },
        { id: 3, topic: 'Physics', title: 'Idea 3', author: 'Author 3', tags: ['Quantum Mechanics', 'Astrophysics'], time: '2023-07-10', popularity: 10 },
    ]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
    };
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const filteredAndSortedIdeas = researchIdeas.filter(
        (idea) =>
            (selectedTopic === 'All' || idea.topic === selectedTopic) &&
            (idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                idea.author.toLowerCase().includes(searchQuery.toLowerCase()))
    ).sort((a, b) => {
        if (sortBy === 'Time') {
            return new Date(b.time) - new Date(a.time);
        } else if (sortBy === 'Popularity') {
            return b.popularity - a.popularity;
        } else {
            //default sort
            return 0;
        }
    });

    const uniqueTopics = ['All', ...new Set(researchIdeas.map((idea) => idea.topic))];

    const handleUpvote = (id) => {
        const updatedIdeas = researchIdeas.map((idea) => {
            if (idea.id === id) {
                return {
                    ...idea,
                    popularity: idea.popularity + 1
                };
            }
            return idea;
        });
        setResearchIdeas(updatedIdeas);
        console.log("Upvoted idea with ID:", id);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">OpenLabs Research</h1>

            <div className="flex justify-between mb-4">
                <div className="w-1/2 pr-2">
                    <p className="text-lg mb-2">Filter by topic:</p>
                    <select
                        className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-green-500"
                        value={selectedTopic}
                        onChange={handleTopicChange}
                    >
                        {uniqueTopics.map((topic) => (
                            <option key={topic} value={topic}>
                                {topic}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-1/2 pl-2">
                    <p className="text-lg mb-2">Sort by:</p>
                    <select
                        className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-green-500"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="Relevance">Relevance</option>
                        <option value="Time">Time</option>
                        <option value="Popularity">Popularity</option>
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-lg mb-2">Search</p>
                <input
                    type="text"
                    placeholder="Search ideas..."
                    className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-green-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div>
                {filteredAndSortedIdeas.map((idea) => (
                    <div key={idea.id} className="border p-4 mb-4 rounded-md flex justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{idea.title}</h3>
                            <p className="text-sm text-gray-600">Author: {idea.author}</p>
                            <p className="text-sm text-gray-600">Topic: {idea.topic}</p>
                            <p className="text-sm text-gray-600">Tags: {idea.tags.join(', ')}</p>
                            <p className="text-sm text-gray-600">Time: {idea.time}</p>
                            <p className="text-sm text-gray-600">Popularity: {idea.popularity}</p>
                        </div>
                        <div className="flex items-center">
                            <div className="cursor-pointer" onClick={() => handleUpvote(idea.id)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 15l7-7 7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
