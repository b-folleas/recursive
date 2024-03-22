FROM python:3.9

# Installation de Conda
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O /tmp/miniconda.sh && \
    bash /tmp/miniconda.sh -b -p /opt/conda && \
    rm /tmp/miniconda.sh && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

# Mettre à jour Conda et installer les outils nécessaires
RUN /opt/conda/bin/conda update -n base -c defaults conda && \
    /opt/conda/bin/conda install -y numpy scikit-learn pytorch

# Set the PATH to include Conda
ENV PATH="/opt/conda/bin:${PATH}"

# Copier l'application Flask
COPY . /app
WORKDIR /app

# Installation des dépendances Python de l'application
RUN pip install -r requirements.txt

# Exposer le port
EXPOSE 5000

# Commande pour lancer l'application
CMD ["python", "app.py"]
