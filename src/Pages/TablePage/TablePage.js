import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TablePage.module.css";
import Table from "../../Components/Table/Table";

export default function StarWarsTable() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(
        JSON.parse(localStorage.getItem("starWarsTotalPages")) || 0
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const cachedData = JSON.parse(localStorage.getItem(`starWarsData-page-${page}`));
            const cachedTotalPages = JSON.parse(localStorage.getItem("starWarsTotalPages"));

            if (cachedData && cachedTotalPages) {
                setData(cachedData);
                setTotalPages(cachedTotalPages);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
                const results = response.data.results;
                setData(results);
                setTotalPages(Math.ceil(response.data.count / 10));

                localStorage.setItem(`starWarsData-page-${page}`, JSON.stringify(results));
                localStorage.setItem("starWarsTotalPages", Math.ceil(response.data.count / 10));
            } catch (err) {
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <span className={styles.loader}></span>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={styles.tableContainer}>
                    <Table
                        data={data}
                        handlePrev={handlePrevPage}
                        handleNext={handleNextPage}
                        currPage={page}
                        disableNext={page >= totalPages}
                    >
                        <li className={styles.tableHeader}>
                            <span>Name</span>
                            <span>Mass</span>
                            <span>Height</span>
                            <span>Hair Color</span>
                            <span>Skin Color</span>
                        </li>
                    </Table>
                </div>
            )}
        </div>
    );
}
