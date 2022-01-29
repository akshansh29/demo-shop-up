import React from 'react'


export default function GifCard(props) {


    return (
        <div className='gif-card'>
            <div className='image'>
                <img src={props.cardData.embed_url} alt={props.cardData.title} />
            </div>
            <div className='gif-name v-center'>
                <div>{props.cardData.title}</div>
            </div>
        </div>
    )
}
