# Siblings - Together Makes Sense

Production code of a clothing website which has since ceased trading. Deployment was a Graphene-Python and Django Oscar e-commerce application hooked up to a ReactJS frontend, all served with Nginx and Gunicorn on a Linode-Linux cloud-based machine. 

# Requirements
The app was built and tested with:
 - Python 3.8.3
 - Node 14.16.1


# Setup
- Clone the code locally with `$ git clone https://github.com/phHank/siblings.git`
- `$ cd siblings`
- `$ pip install -r requirements.txt` *Recommneded* use a virtual environment!
- `$ npm install`
- `$ npm run dev` *NB* Start the Frontend before starting the backend for initial start up
- In a seperate console window `$ python manage.py migrate && python manage.py runserver`
- go to http://localhost:8000/ to test the GUI.

- [Django-Oscar's quick start guide and customisations can be found here](https://django-oscar.readthedocs.io/en/3.0.0/internals/getting_started.html#initial-data)


# Automated Testing
This site was initially built in a time sensitive manner; shamefully, automated testing is still to be implemented in both the backend and the frontend.