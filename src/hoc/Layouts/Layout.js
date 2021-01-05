import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigations/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigations/SideDrawer/SideDrawer';


class Layout extends Component {

state={
    showSideDrawer:false
}

sideDrawerClosedHandler=()=>{
this.setState({showSideDrawer:false});
}

sideDrawerToggleHandler=()=>{
    this.setState((prevState)=>{
        return { showSideDrawer:!prevState.showSideDrawer};
       }   );
}

    render() {
        return (
            <Auxiliary>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClick={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>);
    }

}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);