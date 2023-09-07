                                                            # **Doctor Patient App**

       This is a MEAN stack application where frontend is built using Angular framework, backend using Nodejs and Express and MongoDB is used as a database.

       

The entire code structure is divided into two folders:-
  1. Doctor-patient-backend
  2. Doctor-patient-frontend

     

Following are the steps to run the backend application locally:-
   1. Clone the repository into your local system.
   2. Change the directory to backend folder. i.e for windows use the command--> **cd doctor-patient-backend**.
   3. Run the command **npm install or npm i** to install all the nodejs dependencies used in the project.
   4. Finally, run the command **npm start** to start the backend application.
   5. The nodejs application runs on port **3003**.



Following are the steps to run the frontend application locally:-
   1. Change the directory to frontend folder. i.e for windows use the command--> **cd doctor-patient-frontend**.
   2. Run the command **npm install or npm i** to install all the angular dependencies used in the project.
   3. Finally, run the command **npm start** to start the frontend application.
   4. The angular application runs on port **4200**.


Once both the server is up and running we can access the application from the browser from **http://localhost:4200**.




                                                                              # DOCKER


To create Docker image:-
   1. Go to backend or frontend folder. i.e. for windows use command--> **cd doctor-patient-backend or cd doctor-patient-frontend**.
   2. Make sure the Dockerfile is present inside the folder.
   3. Run the command to build the image in the same directory/folder where Dockerfile is present. **docker build -t "name of the image". or docker build -t "name of the image" -f Dockerfile**.
   4. List the docker image. **docker images**.
   5. Create the container using the backend image created. **docker run -d -p "port to be exposed":"port of the container" "name of the container":version**.





                                                                             # DOCKER-COMPOSE

      


To create image using docker compose file:-
    1. Go to root directory/folder of the repository where docker-compose.yaml file is present.
    2. Execute the command **docker-compose build** to build both the images simultaneously.
    3. To spin up the container use command **docker-compose up**.
    
      

                                                                                   


     

                                                            
