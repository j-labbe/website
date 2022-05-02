import React from 'react';

const TagPreview = (props) => (
    <ul className="tags">
        {props.value.map((v, i) => (
            <li className="tag" key={i}>{v}</li>
        ))}
    </ul>
);

export default TagPreview;