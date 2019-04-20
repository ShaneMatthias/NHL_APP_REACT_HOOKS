import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies) => {
    const [loading, setLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const [isErr, setIsErr] = useState(false);
    const [errMes, setErrMes] = useState(null);

    useEffect(() => {
        setLoading(true);
        console.log('Sending Http request to URL: ' + url);
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            setFetchedData(data);
        })
        .catch(err => {
            setIsErr(true)
            setErrMes(err.message)
        });
    }, dependencies);

    return [loading, fetchedData];
};
