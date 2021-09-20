import React from "react";
import { FaStar } from "react-icons/fa";
const createArray = length => [...Array(length)];


const Star = ({ selected = false }) => (
    <FaStar color={selected ? "red" : "grey"} />
);


export default function StarRating({ totalStars = 5, stars }) {
    return (
        <div className="inline-flex items-center" >
            {createArray(totalStars).map((n, i) => (
                <Star key={i} selected={stars > i} />
            ))}
        </div>
    );
}