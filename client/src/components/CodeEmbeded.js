import React, { Component } from 'react'

export default class CodeEmbeded extends Component {
    render() {
        return (
            <div>
                <iframe 
                    height="500px" 
                    width="100%" 
                    src="https://repl.it/@DuyNguyen28/DarkgrayMedicalApplications?lite=true" 
                    scrolling="no" 
                    frameborder="no" 
                    allowtransparency="true" 
                    allowfullscreen="true" 
                    sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
                >
                </iframe>
            </div>
        )
    }
}

{/* <iframe 
                    src="https://codesandbox.io/embed/romantic-elion-jfpv2?fontsize=14" 
                    title="romantic-elion-jfpv2"
                    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
                    style= {
                        {
                            width:"100%", 
                            height:"500px", 
                            border:"0", 
                            borderRadius: "4px", 
                            overflow:"hidden"
                        }
                    }
                    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                >
                </iframe>  */}
