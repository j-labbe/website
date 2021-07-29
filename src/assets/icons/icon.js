import React from 'react';

import {
    IconGitHub,
    IconInstagram,
    IconLinkedIn,
    IconTikTok,
    IconExternal
} from '.';

const Icon = ({ name }) => {
    switch(name){
        case 'GitHub':
            return <IconGitHub />
        case 'Instagram':
            return <IconInstagram />
        case 'LinkedIn':
            return <IconLinkedIn />
        case 'TikTok':
            return <IconTikTok />
        default:
            return <IconExternal />
    }
}

export default Icon;