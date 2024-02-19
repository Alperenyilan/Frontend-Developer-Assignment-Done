import React, { useEffect } from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import ProductList from "../../components/ProductList/ProductList";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, []);

  const products = useSelector(getAllProducts);
  // console.log(products);
  const productStatus = useSelector(getAllProductsStatus);

  // Birden fazla aynı ürünün eklenmemesini sağlar
  const tempProducts = [];
  if (products.length > 0) {
    // ürünler her defasında sıralaması değişir ve farklı ürünler sunulur.
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  // kategorileri ilgili kategorilere grupla.

  let catProductsOne = products.filter(
    (product) => product.category === categories[0]
  );
  let catProductsTwo = products.filter(
    (product) => product.category === categories[1]
  );
  let catProductsThree = products.filter(
    (product) => product.category === categories[2]
  );
  let catProductsFour = products.filter(
    (product) => product.category === categories[3]
  );

  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>
      {/* Rastgele şekilde sıralanır buradaki ürünler!. Kullanıcıya her defasında farklı ürün gösterir! */}
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={tempProducts} />
              )}
            </div>
            {/* Smartphones datasını aldık. */}
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[0]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsOne} />
              )}
            </div>
            {/* LAPTOPS aldık */}
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[1]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsTwo} />
              )}
            </div>
            {/* FRAGRANCES aldık */}
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[2]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsThree} />
              )}
            </div>
            {/* SKINCARE aldık */}
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[3]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsFour} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
