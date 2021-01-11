import React from "react"

export class Header extends React.Component<{}, {}>{
    constructor(props: {}){
        super(props);
    }

    render(){
        return(
            <div>
                <meta name="csrf-token" content="{{ csrf_token() }}" />
            </div>
        );
    }
}