import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Codepen from "react-codepen-embed";
import axios from 'axios'

export default class CodeEditor extends React.Component {

    state = {
        problem: {}
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
                <Codepen hash={this.state.problem.codePenHash} user={this.state.problem.codePenUserName} />
                {/* <p 
                    className="codepen" 
                    data-height="265" 
                    data-theme-id="0" data-default-tab="result" 
                    data-user="duylnguyen" 
                    data-slug-hash="RXGXBG" 
                    style={
                        {
                            height: "265px",
                            box-sizing: "border-box",
                            display: "flex",
                            align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" }}
                    data-pen-title="RXGXBG"
                        >*/}
                
                
            </div>
    
        );
    }
}
