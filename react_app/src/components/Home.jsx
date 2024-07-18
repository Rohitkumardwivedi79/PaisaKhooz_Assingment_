import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setCourses(response.data);
      }  catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage, { toastId: 'fetchCoursesError' });
        } else {
          toast.error('Failed to fetch courses', { toastId: 'fetchCoursesError' });
        }
      }
    }

    fetchCourses();
  }, []);




  

  const handleEnrollCourse = async () => {
    toast.warning("Feature Available Soon..")
  };

  function truncateDescription(description, wordLimit) {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  

  const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const results = courses.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase())
              );
                setSearchResult(results);
            } catch (error) {
                console.error('Error searching:', error);
                setSearchResult([]);
            }
        };

        if (query !== '') {
            fetchData();
        } else {
            setSearchResult([]);
        }
    }, [query]);

    useEffect(() => {
        if (query === '') {
            setSearchResult([]);
        }
    }, [query]);
    if(!token){
      return <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
          <h3 className='text-danger'>Please Login First !!</h3>
        </div>
    }
    return (
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6">
            <h2 className="mt-3 ">
              {query === '' ? (
                <h2 className="mt-3 mb-2">All Products</h2>
              ) : searchResult.length !== 0 ? (
                <h2 className="mt-3 mb-2">Found Products ..</h2>
              ) : ''
              }
            </h2>
          </div>

          <div className="col-md-6 mt-3">
          <div className="w-100 mb-4 form-outline" style={{ minWidth: '200px', border: '1px solid #808080', borderRadius: '0.25rem' }}>
              <input
                type="search"
                value={query}
                onChange={handleSearch}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Search Course ..."
              />
            </div>
          </div>
        </div>
        <ToastContainer />

        {query !== '' && searchResult.length === 0 && (
  <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
    <h3 className='text-danger'>No Product Found !!</h3>
  </div>
)}


      <div className="row row-cols-1 row-cols-md-3 g-4">
        {query==='' && courses.map((course) => (
        
          <div className="col" key={course._id}>
            <div className="card h-100">
            <div className="image-container" style={{ height: '400px',width : '100%', overflow: 'hidden' }}>
                <img src={course.image} className="card-img-top" alt={course.title} style={{ objectFit: 'contain',height: '100%' }} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.title}</h5>

                <p className="card-text flex-grow-1">{truncateDescription(course.description, 25)}</p>
                <div className="d-flex align-items-center justify-content-between mt-auto">
                <div className="rating me-3">
                {
                Array.from({ length: course.rating.rate }).map((_, index) => (
                  <span key={index} style={{ color: '#fca503', fontSize: '1.3rem' }}>★</span>
                ))
              }
                  </div>
                  <div className="price-box">
                    <p className="card-price mb-0">
                      <button className="btn btn-warning">{course.price} ₹</button>
                    </p>
                  </div>
                </div>
                <div className="d-flex mt-3 justify-content-between">
                
                  <button className="btn btn-secondary me-2" onClick={() => handleEnrollCourse(course._id)}>
                    Enroll
                  </button>

                  <Link >
                    <button className="btn btn-primary" onClick={() => handleEnrollCourse(course._id)}>Explore</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {query!=='' && searchResult.map((course) => (
        
        <div className="col" key={course._id}>
          <div className="card h-100">
          <div className="image-container" style={{ height: '400px',width : '100%', overflow: 'hidden' }}>
                <img src={course.image} className="card-img-top" alt={course.title} style={{ objectFit: 'contain',height: '100%' }} />
              </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{course.title}</h5>

              <p className="card-text flex-grow-1">{truncateDescription(course.description, 15)}</p>
              <div className="d-flex align-items-center justify-content-between mt-auto">
              <div className="rating me-3">
                {
                Array.from({ length: course.rating.rate }).map((_, index) => (
                  <span key={index} style={{ color: '#fca503', fontSize: '1.3rem' }}>★</span>
                ))
              }
                </div>
                <div className="price-box">
                  <p className="card-price mb-0">
                    <button className="btn btn-warning">{course.price} ₹</button>
                  </p>
                </div>
              </div>
              <div className="d-flex mt-3 justify-content-between">
                  <button className="btn btn-success me-2" onClick={()=>toast.warning("Feature Available Soon..")}>Enroll</button>
                  <Link >
                    <button className="btn btn-primary" onClick={() => handleEnrollCourse(course._id)}>Explore</button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default AllCourses;
