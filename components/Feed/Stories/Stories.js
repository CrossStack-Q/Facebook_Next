import React from 'react'
import StoryCard from './StoryCard/StoryCard';

const stories = [
    {
        name: "Ram Parashar",
        src: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/four.png",
        profile: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/three.png"
    },
    {
        name: "Ram Parashar",
        src: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/four.png",
        profile: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/three.png"
    },
    {
        name: "Ram Parashar",
        src: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/four.png",
        profile: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/three.png"
    },
    {
        name: "Ram Parashar",
        src: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/four.png",
        profile: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/three.png"
    },
    {
        name: "Ram Parashar",
        src: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/four.png",
        profile: "https://raw.githubusercontent.com/Cross-Rehk/Some_Extra_files/main/logo_flies/three.png"
    },

    
];


function Stories() {
  return (
    <div className='flex justify-center space-x-3 mx-auto'>
        {stories.map((story) => (
            <StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile} />
        ))}
    </div>
  )
}

export default Stories