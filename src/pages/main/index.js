import React, {Component} from 'react';
import api from '../../services/api';

export default class Main extends Component{
    // no React não se salva valores em qualquer variável, se salva no State
    state = {
        products: []
    };

    componentDidMount(){
        this.loadProducts();
    }
    
    // métodos que não são do React como por ex. render e componentDidMount
    // devem ser declarados como arrow function, para ter escopo aos elementos
    // da própria classe (this)
    loadProducts = async () => {
        const response = await api.get('products');
        
        this.setState({products: response.data.docs});
    };
    
    
    render(){
        return(
            <div className="product-list">
                {this.state.products.map( product => (
                    <h2 key={product._id} >{product.title}</h2>
                ))}
            </div>
        );
    }
}