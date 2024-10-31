import styles from "./Table.module.css";
import React from "react";

export default function Table({data, handlePrev, handleNext, currPage, children, disableNext}) {
    return (
        <>
            <ul>
                {children}
                {data.map((person, index) => (
                    <li key={index} className={styles.tableRow}>
                        <span>{person.name}</span>
                        <span>{person.mass}</span>
                        <span>{person.height}</span>
                        <span>{person.hair_color}</span>
                        <span>{person.skin_color}</span>
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <button onClick={handlePrev} disabled={currPage === 1}>
                    Previous
                </button>
                <span>Page {currPage}</span>
                <button onClick={handleNext} disabled={disableNext}>Next</button>
            </div>
        </>
    )
}