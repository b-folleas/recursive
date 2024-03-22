FROM python:3.9

# Conda Installation
RUN apt-get update && \
    apt-get install -y wget && \
        # Download and run Miniconda installer
    wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O /tmp/miniconda.sh && \
    bash /tmp/miniconda.sh -b -p /opt/conda && \
    rm /tmp/miniconda.sh && \
        # Create symbolic link to Conda's configuration script
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
        # Add Conda initialization to bashrc
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda init" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

# Conda update and other tools installation
RUN /opt/conda/bin/conda update -n base -c defaults conda && \
    /opt/conda/bin/conda install -y numpy scikit-learn pytorch

# Conda install faiss
RUN /opt/conda/bin/conda install faiss-cpu -c pytorch

# Set the PATH to include Conda
ENV PATH="/opt/conda/bin:${PATH}"

# Copy Flask app
COPY . /app
WORKDIR /app

# Install Flask app dependencies
RUN pip install -r requirements.txt

EXPOSE 5000

# Launch app
CMD ["python", "app.py"]
