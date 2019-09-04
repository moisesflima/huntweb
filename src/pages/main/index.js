import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component{
    // no React não se salva valores em qualquer variável, se salva no State
    state = {
        products: [],
        productInfo: {},
        page: 1,
    };

    componentDidMount(){
        this.loadProducts();
    }
    
    // métodos que não são do React como por ex. render e componentDidMount
    // devem ser declarados como arrow function, para ter escopo aos elementos
    // da própria classe (this)
    loadProducts = async (page = 1) => {
        const response = await api.get(`products?page=${page}`);
        
        // ... é o rest operator
        const { docs, ...productInfo } = response.data;

        this.setState({products: docs, productInfo, page});
    };
    
    prevPage = () => {

        const {page} = this.state;

        // página atual é igual a 1, não faz nada
        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);

    }

    nextPage = () => {

        const {page, productInfo} = this.state;

        // página atual é igual ao número de páginas, não faz nada
        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);

    }
    
    render(){

        const { products, page, productInfo } = this.state; 

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
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page===productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>                
            </div>
        );
    }
}