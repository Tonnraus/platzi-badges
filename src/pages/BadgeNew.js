import React from 'react';

import './styles/BadgeNew.css'
import header from '../img/logo.png'
// import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import api from '../api';

class BadgeNew extends React.Component{
  state = {
    loading: false,
    error:null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
      avatarUrl:'',
    },
  };
  //We initialize an state here to save it from Form

  handleChange = e => {
    // const nextStateForm = this.state.form
    // nextStateForm[e.target.name] = e.target.value; --> first option to keep the object state and not to ove write
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async e =>{
    e.preventDefault();
    this.setState({loading:true,error:null});

    try{
      await api.badges.create(this.state.form);
      this.setState({loading:false});

      this.props.history.push('/badges')

    }catch(error){
      this.setState({loading:false,error:error})
    }
  }
  render(){
    if(this.state.loading){
      return <PageLoading/>;
    }
    //Now we want to update the information from the inputs into the Badge section
    return(
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img className="BadgeNew__hero-image img-fluid" src={header} alt="Logo"/>
        </div>
        <div className="con">
          <div className="row">
            <div className="col-6">
              <Badge 
              userName={this.state.form.firstName || 'FIRST_NAME'}
              lastName={this.state.form.lastName || 'LAST_NAME'}
              twitter={this.state.form.twitter || 'TWITTER'}
              email={this.state.form.email || 'EMAIL_ADRESS'}
              profession={this.state.form.jobTitle || 'JOB_TITLE'}
              />
            </div>
            <div className="col-6">
              <h1>New Attendant</h1>
              <BadgeForm  
              onChange={this.handleChange}
              onSubmit={this.handleSubmit} 
              formValues={this.state.form}
              error={this.state.error}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default BadgeNew;