
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'
import ReadProductsComponent from './app/read_products.components';
import ReadOneProductComponent from './app/read_one_product.components';

// component that decides which main component to load: read or create/update
var MainApp = React.createClass({
    
       // initial mode is 'read' mode
       getInitialState: function(){
           return {
               currentMode: 'read',
               productId: null
           };
       },
    
       // used when use clicks something that changes the current mode
       changeAppMode: function(newMode, productId){
           this.setState({currentMode: newMode});
               if(productId !== undefined){
               this.setState({productId: productId});
           }
       },
    
       // render the component based on current or selected mode
       render: function(){
    
           var modeComponent =
               <ReadProductsComponent
               changeAppMode={this.changeAppMode} />;
    
           switch(this.state.currentMode){
               case 'read':
                   break;
               case 'readOne':
                   modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                   break;
            //    case 'create':
            //        modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode}/>;
            //        break;
            //    case 'update':
            //        modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
            //        break;
            //    case 'delete':
            //        modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
            //        break;
            //    default:
            //        break;

           }
    
           return modeComponent;
       }
   });
    
   export default MainApp ;