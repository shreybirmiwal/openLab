import React, { useState } from 'react';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [sortBy, setSortBy] = useState('Relevance');

    const researchIdeas = [
        { id: 1, topic: 'Computer Science', title: 'Idea 1', author: 'Author 1', tags: ['AI', 'NLP'], time: '2023-05-15', popularity: 8 },
        { id: 2, topic: 'Biology', title: 'Idea 2', author: 'Author 2', tags: ['Genetics', 'Cell Biology'], time: '2023-03-20', popularity: 5 },
        { id: 3, topic: 'Physics', title: 'Idea 3', author: 'Author 3', tags: ['Quantum Mechanics', 'Astrophysics'], time: '2023-07-10', popularity: 10 },
    ];

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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">OpenLabs Research</h1>

            <div className="mb-4">
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

            <div className="mb-4">
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

            <input
                type="text"
                placeholder="Search ideas..."
                className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:border-green-500 mb-4"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <div>
                {filteredAndSortedIdeas.map((idea) => (
                    <div key={idea.id} className="border p-4 mb-4 rounded-md">
                        <h3 className="text-lg font-semibold">{idea.title}</h3>
                        <p className="text-sm text-gray-600">Author: {idea.author}</p>
                        <p className="text-sm text-gray-600">Topic: {idea.topic}</p>
                        <p className="text-sm text-gray-600">Tags: {idea.tags.join(', ')}</p>
                        <p className="text-sm text-gray-600">Time: {idea.time}</p>
                        <p className="text-sm text-gray-600">Popularity: {idea.popularity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
