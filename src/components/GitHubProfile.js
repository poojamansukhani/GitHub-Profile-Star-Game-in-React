import React, {createRef} from 'react';
import axios from 'axios';
const testData = [
    {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];
const CardList = (props) => (
    <div>
        {props.profile.map(profile => <Card {...profile}/>)}
        {/* aove line same as [<Card/>, <Card/>, <Card/>] */}
        {/* <Card {...testData[0]}/>
        <Card {...testData[1]}/> */}
    </div>
) 

class Card extends React.Component{
    render(){
        const profile = this.props;
        return(
            <div className="github-profile">
                <img src={profile.avatar_url} />
                <div className="info">
                <div className="name">{profile.name}</div>
                <div className="company">{profile.company}</div>
                </div>
            </div>
        )
    }
}
//Example with Ref 
// class Form extends React.Component{
//     userNameInput = React.createRef();
//     handleSubmit = (e) =>{
//         e.preventDefault();
//         console.log(this.userNameInput.current.value)
//     }
//     render(){
//         return(
//             <form action="" onSubmit={this.handleSubmit}>
//                 <input type="text" placeholder="Github User Name" ref={this.userNameInput} required/>
//                 <button>Add Card</button>
//             </form>
//         )
//     }
// }


//Example with setState Control value directly through react using setState rather than reading from DOM using ref. It is called controlled component
class Form extends React.Component{
    state = { userName: ''};
    handleSubmit = async (event) => {
        event.preventDefault();
        const res =await axios.get(`https://api.github.com/users/${this.state.userName}`)
        this.props.onSubmit(res.data);
        this.setState({userName:''});
    }
    render(){
        return(
            <form action="" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Github User Name" value={this.state.userName} onChange={event => this.setState({userName:event.target.value})} required/>
                <button>Add Card</button>
            </form>
        )
    }
}


class GitHubPorfile extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         profile: testData,
    //     };
    // }
    state = {
        profile: [],
    }
    addNewProfile = (profileData) => {
        console.log('GitHubPorfile', profileData)
        this.setState(prevState => ({
            profile: [...prevState.profile, profileData],
        }))
    }
    render(){
        return(
            <>
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile}/>
                <CardList profile={this.state.profile}/>
            </>
        )
    }
}

export  default GitHubPorfile;
