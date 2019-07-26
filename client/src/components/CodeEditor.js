import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Codepen from "react-codepen-embed";
import axios from 'axios'

export default class CodeEditor extends React.Component {

    state = {
        problem: {
            
        }
    }

    componentDidMount() {
        this.getSingleProblem()
    }

    getSingleProblem = async () => {
        const res = await axios.get(`/api/problem/${this.props.match.params.problemId}`)
        this.setState({problem: res.data})
    }

    onChange(newValue) {
        console.log('change', newValue);
    }

    render() {
        const userName = this.state.problem.codePenUserName
        const hash = this.state.problem.codePenHash
        return (
            <div>
                {/* <AceEditor
                    mode="javascript"
                    theme="monokai"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}

                    
                /> */}
                {
                    this.state.problem.codePenHash
                        ? <Codepen hash={this.state.problem.codePenHash} user={this.state.problem.codePenUserName} />
                        : 'Working on Loading Screen Semantic React UI'
                }
                {
                    // this.state.problem.codePenHash
                    //     ? <p 
                    //     className="codepen" 
                    //     data-height="265" 
                    //     data-theme-id="0"
                    //     data-default-tab="result" 
                    //     data-user={userName}
                    //     data-slug-hash={hash} 
                    //     style={
                    //         {
                    //             height: "265px",
                    //             boxSizing: "border-box",
                    //             display: "flex",
                    //             alignItems: "center",
                    //             justifyCcontent: "center",
                    //             border: "2px solid",
                    //             margin: "1em 0",
                    //             padding: "1em"
                    //         }
                    //     }
                    //     data-pen-title="Sum"
                    // >
                    
                    //     <span>
                    //         See the Pen <a href={`https://codepen.io/${userName}/pen/${hash}/`}>
                    //     Sum</a> by Duy Nguyen (<a href={`https://codepen.io/${userName}`}>@{userName}</a>)
                    //     on <a href="https://codepen.io">CodePen</a>.
                    //     </span>
                    // </p>
                    // : null
                }    
            </div>
    
        );
    }
}
