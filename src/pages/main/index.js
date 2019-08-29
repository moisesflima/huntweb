import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';

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

        const { products } = this.state; 

        return(
            <div className="product-list">
                {products.map( product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <a href="">Acessar</a>
                    </article>                    
                ))}
                <div className="actions">
                    <button>Anterior</button>
                    <button>Próximo</button>
                </div>                
            </div>
        );
    }
}