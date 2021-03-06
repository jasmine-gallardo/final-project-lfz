import React from 'react';
import CourseSearchResult from './course-search-result';

export default class SearchCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryName: '',
      courses: []
    };
    this.handleChangeSelection = this.handleChangeSelection.bind(this);
    this.handleGetCourses = this.handleGetCourses.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categoriesArray =>
        this.setState({
          categories: categoriesArray
        }))
      .catch(err => console.error(err));
  }

  handleChangeSelection(event) {
    this.setState({
      categoryName: event.target.value
    });
    if (event.target.value) {
      this.handleGetCourses(event.target.value);
    }
  }

  handleGetCourses(categoryName) {
    fetch('/api/courseCategories/' + categoryName)
      .then(res =>
        res.json())
      .then(coursesArray => {
        this.setState({
          courses: coursesArray.courses
        });
      })
      .catch(err => console.error(err));
  }

  handleReset() {
    this.setState({
      categories: [],
      categoryName: '',
      courses: []
    });
    this.getCategories();
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <form onReset={this.handleReset} autoComplete="off">
          <div className="mb-4 text-center" id="for-cat-search" >
            <label htmlFor="search-cat"></label>
            <input onChange={this.handleChangeSelection} className="search-box mr-3"
              list="categories" id="cat-search" name="category-search" placeholder="Search by Category"/>
            <button
              className="p-2 btn btn-info" type="reset" id="clear-select"> Reset</button>
            <datalist id="categories" >
              {this.state.categories.map((cat, key) => {
                return (
                  <option key={cat.categoryId} value={cat.categoryName} >
                    {cat.categoryName}
                  </option>);
              })}
            </datalist>
          </div>
        </form>
        <div className="ml-4 mb-2 h2 open-sans text-info">{this.state.categoryName}</div>
        {this.state.courses.map((course, key) => {
          return (
            <CourseSearchResult
              key={course.courseId}
              courses={this.state.courses}
              name={course.name}
              courseDesc={course.description}
              courseId={course.courseId}
              userName={this.props.userName}
              userId={this.props.userId}
              setView={this.props.setView}
              setCourse={this.props.setCourse}
              setBackPage={this.props.setBackPage}
              currentPage={'searchCourses'}
              setLessons={this.props.setLessons}
              setEnrollment={this.props.setEnrollment}
            />
          );
        })}
      </div >
    );
  }
}
