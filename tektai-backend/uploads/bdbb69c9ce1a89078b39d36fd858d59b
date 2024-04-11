import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

data = pd.read_csv('TpACPcovid23.csv')

print(data.columns)
print(data.shape)
print(data['iso_code'].head())
print(data.head())

data['iso_code'] = data['iso_code'].astype(str)

owid_lines = data['iso_code'].str.startswith("OWID_")
owid_data = data[owid_lines]

print(any(data['iso_code'] == "KOS"))

kosovo_index = data.index[data['iso_code'] == "OWID_KOS"].tolist()
data.loc[kosovo_index, 'iso_code'] = "KOS"

data = data[~owid_lines]

selection = data.columns[~(data.columns.str.startswith("new_") | data.columns.str.startswith("weekly_"))]
data = data[selection]

def count_non_null(col):
    return np.sum(~col.isnull())

selection = [col for col in selection if count_non_null(data[col]) > data.shape[0] / 2]
data = data[selection]

data = data.drop(columns=['tests_units'])

newData = data.drop(columns=['total_cases', 'total_deaths', 'population'])
newData.index = newData['iso_code']
newData = newData.drop(columns=['iso_code', 'date'])

print(newData.describe())

pca = PCA(n_components=6)
pca.fit(newData)
transformed_data = pca.transform(newData)

plt.figure(figsize=(15, 10))
plt.subplot(1, 2, 1)
plt.scatter(transformed_data[:, 0], transformed_data[:, 1])
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.title('PCA - Individuals')

plt.subplot(1, 2, 2)
plt.bar(range(len(pca.explained_variance_ratio_)), pca.explained_variance_ratio_)
plt.xlabel('Principal Components')
plt.ylabel('Variance Ratio')
plt.title('PCA - Variance Ratio')
plt.show()
