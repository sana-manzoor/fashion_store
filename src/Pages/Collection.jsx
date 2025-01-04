import React, { useState, useEffect } from 'react';
import Productcard from '../Components/Productcard';
import Allprod from '../Components/Allprod';
import './collection.css'
import { getallp } from '../services/allApis'
import { BASE_URL } from '../services/baseUrl'
import { useNavigate } from 'react-router-dom'
import { addcart } from '../services/allApis'
import { toast } from 'react-toastify'


function Collection() {
  const [isVisible, setIsVisible] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleFilters = () => {
    setIsVisible(!isVisible);
  };

  const [selectedCategories, setSelectedCategories] = useState({
    men: false,
    women: false,
    kids: false,
  });

  const [selectedSubcategories, setSelectedSubcategories] = useState({
    men: [],
    women: [],
    kids: [],
  });

  const [allp, setAllp] = useState([])

  const [cart, setCart] = useState({})

  const [sortOption, setSortOption] = useState('relevant');

  const [search, setSearch] = useState("")

  const handleSizeSelection = (size) => {
    setCart((prev) => ({ ...prev, size }));
  };

  const getAvailableSubcategories = (category) => {
    const subcategories = allp
      .filter((product) => product.category === category)
      .map((product) => product.subcategory);
    return [...new Set(subcategories)]; 
  };



  const handleCategorySelection = (e) => {
    const { name, checked } = e.target;
    setSelectedCategories((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };



  const handleSubcategorySelection = (e, category) => {
    const { name, checked } = e.target;
    setSelectedSubcategories((prevState) => {
      const updatedSubcategories = { ...prevState };
      if (checked) {
        updatedSubcategories[category] = [...updatedSubcategories[category], name];
      } else {
        updatedSubcategories[category] = updatedSubcategories[category].filter(
          (subcat) => subcat !== name
        );
      }
      return updatedSubcategories;
    });
  };


  const addtocart = async (item) => {
    if (!sessionStorage.getItem("currentUser")) {
      toast.warning("Login First!!")
      navigate('/log')
    }
    else if (!cart.size) {
      toast.warning("Please choose a size!!")
    }
    else {
      const id = sessionStorage.getItem("currentUser")
      const idd = JSON.parse(id)
      const dataToSend = { pid: item._id, title: item.title, price: item.price, size: cart.size, image: item.image, uid: idd };

      console.log(dataToSend)
      const res1 = await addcart(dataToSend)
      console.log(res1)
      if (res1.status === 200) {
        toast.success("Product added to cart!!")
        setCart((prev) => ({ ...prev, size: null }));
        navigate('/cart')
      }
      else {
        toast.error("Product Already excists in cart")
      }
    }
  }

  const allprod = async () => {
    const result = await getallp(search);
    if (result.status === 200) {
      setAllp(result.data); // Set all products

      const filtered = result.data.filter((item) => {
        const categoryMatch = selectedCategories[item.category] || !Object.values(selectedCategories).includes(true);

        // Check for subcategory matches if a category is selected
        const subcategoryMatch =
          selectedSubcategories[item.category] &&
            selectedSubcategories[item.category].length
            ? selectedSubcategories[item.category].includes(item.subcategory)
            : true;

        return categoryMatch && subcategoryMatch;
      });

      setFilteredProducts(filtered); // Set filtered products
    }
  };


  const navigate = useNavigate()


  const handle = async (id) => {
    localStorage.setItem("id", id)
    navigate('/viewp')
  }

  useEffect(() => {
    allprod()
  }, [search, selectedCategories, selectedSubcategories])

  const subcategoryOptions = {
    men: ['topwear', 'bottomwear', 'winterwear'],
    women: ['topwear', 'bottomwear', 'winterwear'],
    kids: ['topwear', 'bottomwear', 'winterwear'],
  };



  console.log(allp)

  useEffect(() => {
    // Sorting logic
    let sortedProducts = [...filteredProducts];
    if (sortOption === 'low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="container mb-5" style={{ marginTop: '80px', minHeight: '400px' }}>

      <div className="container mt-5 mb-4">
        <div className="input-group container">
          <input type="text" className="form-control rounded-pill" placeholder="Search here..." aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
          {/* <button className="btn btn-primary rounded-pill ms-2" type="button">
            <i className="fas fa-search"></i>
          </button> */}
        </div>
      </div>

      <div className="row">

        {/* Button to toggle visibility on small screens */}
        <button className="custom-toggle-button d-block d-md-none mb-3" onClick={toggleFilters}>
          {isVisible ?
            <>

              Filters <i className="fa-solid fa-caret-down " style={{ color: '#a21127' }}></i>

            </>
            :
            <>
              Filters <i className="fa-solid fa-caret-down " style={{ color: '#a21127' }}></i>
            </>}
        </button>


        <div className={`col-12 col-md-3 ${isVisible ? '' : 'd-none d-md-block'}`}>
          <div className="border p-3 shadow-sm rounded mb-4">
            <h4 className="text-center mb-3">FILTERS</h4>
            <div className="mb-3">
              <form>
                <label htmlFor="category" className="p-2"><b>CATEGORIES</b></label>
                <br />
                <input type="checkbox" name="men" onChange={handleCategorySelection} /> MEN <br />
                <input type="checkbox" name="women" onChange={handleCategorySelection} /> WOMEN <br />
                <input type="checkbox" name="kids" onChange={handleCategorySelection} /> KIDS <br />
              </form>
            </div>

            <div>
              <form>
                <label htmlFor="category" className="p-2"><b>TYPE</b></label>
                <br />
                {selectedCategories.men && getAvailableSubcategories('men').map((subcat) => (
                  <div key={subcat}>
                    <input
                      type="checkbox"
                      name={subcat}
                      onChange={(e) => handleSubcategorySelection(e, 'men')}
                    /> {subcat} <br />
                  </div>
                ))}
                {selectedCategories.women && getAvailableSubcategories('women').map((subcat) => (
                  <div key={subcat}>
                    <input
                      type="checkbox"
                      name={subcat}
                      onChange={(e) => handleSubcategorySelection(e, 'women')}
                    /> {subcat} <br />
                  </div>
                ))}
                {selectedCategories.kids && getAvailableSubcategories('kids').map((subcat) => (
                  <div key={subcat}>
                    <input
                      type="checkbox"
                      name={subcat}
                      onChange={(e) => handleSubcategorySelection(e, 'kids')}
                    /> {subcat} <br />
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="ht1" style={{ display: 'inline' }}>
              All <span className="ht2">COLLECTIONS</span>
            </h2>
            <span className="text-end">
              <select className="form-select text-sm px-3 border-2 border-gray-300" value={sortOption} onChange={handleSortChange}>
                <option disabled value="relevant">Sort by: </option>
                <option value="low-high">---Low to High---</option>
                <option value="high-low">---High to Low---</option>
              </select>
            </span>
          </div>


          <div>
            <div className="row">
              {(filteredProducts.length > 0 ? filteredProducts : allp).map((item) => (
                <div key={item._id} className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="product-card shadow-sm rounded">
                    <img
                      src={`${BASE_URL}/upload/${item.image}`}
                      alt="Product"
                      onClick={() => handle(item._id)}
                      className="product-image rounded-top"
                    />
                    <div className="product-info p-2">
                      <h2 className="product-title mb-2 ht1">{item.title}</h2>
                      <p className="product-price ht1 fw-bold">₹{item.price}</p>
                      <div className="d-flex justify-content-evenly ">
                      <select id="size" className="form-select m-1" onChange={(e) => handleSizeSelection(e.target.value)}>
                        <option value="" selected disabled>--Select Size--</option>
                        {/* <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option> */}
                        {item.size.map((size) => (
                          <option key={size} value={size}>
                            {size === "S"
                              ? "Small (S)"
                              : size === "M"
                                ? "Medium (M)"
                                : size === "L"
                                  ? "Large (L)"
                                  : size === "XL"
                                    ? "Extra Large (XL)"
                                    : size}
                          </option>
                        ))}
                      </select>

                      <button className='btn btn-outline-dark' onClick={() => addtocart(item)}>
                        <span><i className="fa-solid fa-cart-plus fa-lg"></i></span>
                      </button>
                      </div>
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Collection;
