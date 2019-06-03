import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';
import {Link} from 'react-router-dom';

 export default class Main extends Component{

    state = {
        products:[],
        productInfo:{},
        page:1,
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page=1) =>{
        const response = await api.get(`/products?page=${page}`);
        //Copiando o conteudo de docs para docs, e todo o resto para 
        //product info
        const {docs, ...productInfo}=response.data;
        this.setState({products:docs,productInfo,page});        
        console.log(response.data.docs);
    };

    nextPage=()=>{
        const { page, productInfo} = this.state;
        //Se for a ultima pagina nao vai fazer mais nada
        if(page===productInfo.pages) return; 
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    prevPage=()=>{
        const {page} = this.state;
        //Se for a ultima pagina nao vai fazer mais nada
        if(page===1) return; 
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }
    render(){        
        const {products} = this.state;        
        return (
            <div className="product-list">
              {products.map((product)=>(                  
                  <article key={product._id}>
                      <strong>{product.title}</strong>
                      <p>{product.description}</p>
                      <Link to={`/products/${product._id}`}>Acessar</Link>
                  </article>  
              ))}  
              <div className="actions">
                  <button disabled={this.state.page === 1} onClick={this.prevPage}>Anterior</button>
                  <button disabled={this.state.page === this.state.productInfo.pages} onClick={this.nextPage}>Próxima</button>
              </div>    
            </div>
        )
    } 
 }