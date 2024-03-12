# Stage 1: Build environment (slim)
FROM python:3.9-slim 

WORKDIR /app

RUN apt-get update \
    && apt-get -y install libpq-dev gcc 
    
COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .


CMD ["python", "generate_db.py"]  
