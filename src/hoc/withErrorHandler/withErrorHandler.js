import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler=(WrappedComponent,axios)=>{ //take wrappedComponent as input
    return class extends Component{

        state={
            error:null
        }
        componentWillMount(){
            this.reqInterceptors=axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptors=axios.interceptors.response.use(res=>res,error=>{
            this.setState({error:error});
            })
        }

componentWillUnmount(){
   
axios.interceptors.request.eject(this.reqInterceptors);
axios.interceptors.response.eject(this.resInterceptors);
}

        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render (){
            return (<Auxiliary>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmedHandler}>
                  {this.state.error ?this.state.error.message:null}
                </Modal>
            { <WrappedComponent {...this.props} /> //distribute props which this coponent might receive */
        }
            </Auxiliary>);
        }
    }
} 
export default withErrorHandler;
