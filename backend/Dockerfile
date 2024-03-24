FROM python:3.12

# System dependencies installation
RUN apt-get update && \
    apt-get install -y wget libsm6 libxext6 libxrender-dev

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


# Set the PATH to include Conda
ENV PATH="/opt/conda/bin:${PATH}"

# Conda update and other tools installation
RUN conda update -n base -c defaults conda && \
    conda install -y pytorch && \
    conda install flask && \
    conda install flask_cors && \
    conda install scikit-image -c conda-forge

# Conda install faiss
RUN conda install faiss-cpu -c pytorch

# Copy Flask app
COPY . /app
WORKDIR /app

# Create Conda environment and install dependencies
# COPY environment.yml .
# RUN conda env create -f environment.yml

# Activate Conda environment
# RUN echo "conda activate $(head -1 environment.yml | cut -d' ' -f2)" > ~/.bashrc

EXPOSE 5000

# Launch app
CMD ["python", "app.py"]
