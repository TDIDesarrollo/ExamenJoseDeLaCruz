// src/hooks/useDataFetcher.js
import { useState, useEffect } from 'react';
import { getPosts } from '../api/postsService';

export const useDataFetcher = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const posts = await getPosts(); 
                setData(posts);
            } catch (err) {
                setError(err.message); 
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return { data, loading, error, setData };
};