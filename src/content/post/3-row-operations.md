---
title: "Row Operations on Determinants"
description: "Impact of Row Operations on Determinants and Matrix Singularity"
publishDate: "06 May 2024"
tags: ["linear systems", "matrix", "determinant", "numpy"]
---

The following row operations affects the determinant of a matrix but **NOT THE MATRIX SINGULARITY**.
We are going to make operations on the matrix $M$ with $det(M) = 8$:

$$
M = \begin{bmatrix}
    3 & 4 & 5 & 1 \\
    1 & 2 & 3 & 2 \\
    5 & 2 & 3 & 5 \\
    5 & 2 & 3 & 6
\end{bmatrix}
$$

```python
M = np.array([
    [3, 4, 5, 1],
    [1, 2, 3, 2],
    [5, 2, 3, 5],
    [5, 2, 3, 6],
], dtype="float32")
print(M)
det_M = np.linalg.det(M)
print(f"{det_M=}"
```
Output:
```bash
[[3. 4. 5. 1.]
 [1. 2. 3. 2.]
 [5. 2. 3. 5.]
 [5. 2. 3. 6.]]
det_M=8.0
```

### Swapping 2 rows
Swapping **one position** 2 rows of a matrix, changes the sign of its determinant.

$$
r_{1} \leftrightarrow r_{2}
$$

$$
M = \begin{bmatrix}
    3 & 4 & 5 & 1 \\
    \textcolor{green}{1} & \textcolor{green}{2} & \textcolor{green}{3} & \textcolor{green}{2} \\
    \textcolor{red}{5} & \textcolor{red}{2} & \textcolor{red}{3} & \textcolor{red}{5} \\
    5 & 2 & 3 & 6
\end{bmatrix} \xrightarrow{r_{1} \leftrightarrow r_{2}}
M_{1} = \begin{bmatrix}
    3 & 4 & 5 & 1 \\
    \textcolor{red}{5} & \textcolor{red}{2} & \textcolor{red}{3} & \textcolor{red}{5} \\
    \textcolor{green}{1} & \textcolor{green}{2} & \textcolor{green}{3} & \textcolor{green}{2} \\
    5 & 2 & 3 & 6
\end{bmatrix}
$$


$$
det(M_{1}) = -det(M) = -8
$$

```python
# Row Swapping: 1 position
# Swapping row 1 with row 2.
# |M| * -1
M1 = M.copy()
M1[[2, 1]] = M1[[1, 2]]
print(M1)
det_M1 = np.linalg.det(M1)
print(f"{det_M1=} is -1 * {det_M=}"
```
Output:
```bash
[[3. 4. 5. 1.]
 [5. 2. 3. 5.]
 [1. 2. 3. 2.]
 [5. 2. 3. 6.]]
det_M1=-8.0 is -1 * det_M=8.0
```

Swapping **two positions** 4 rows of a matrix, changes the sign of its determinant.

$$
r_{0} \leftrightarrow r_{1} \\
r_{2} \leftrightarrow r_{3}
$$

$$
M = \begin{bmatrix}
    \textcolor{red}{3} & \textcolor{red}{4} & \textcolor{red}{5} & \textcolor{red}{1} \\
    \textcolor{green}{1} & \textcolor{green}{2} & \textcolor{green}{3} & \textcolor{green}{2} \\
    5 & 2 & 3 & 5 \\
    5 & 2 & 3 & 6
\end{bmatrix} \xrightarrow{r_{0} \leftrightarrow r_{1}}
M_{1} = \begin{bmatrix}
    \textcolor{green}{1} & \textcolor{green}{2} & \textcolor{green}{3} & \textcolor{green}{2} \\
    \textcolor{red}{3} & \textcolor{red}{4} & \textcolor{red}{5} & \textcolor{red}{1} \\
    5 & 2 & 3 & 5 \\
    5 & 2 & 3 & 6
\end{bmatrix}
$$

$$
det(M_{1}) = det(M) * -1
$$


$$
M_{1} = \begin{bmatrix}
    1 & 2 & 3 & 2 \\
    3 & 4 & 5 & 1 \\
    \textcolor{green}{5} & \textcolor{green}{2} & \textcolor{green}{3} & \textcolor{green}{5} \\
    \textcolor{red}{5} & \textcolor{red}{2} & \textcolor{red}{3} & \textcolor{red}{6}
\end{bmatrix} \xrightarrow{r_{2} \leftrightarrow r_{3}}
M_{2} = \begin{bmatrix}
    1 & 2 & 3 & 2 \\
    3 & 4 & 5 & 1 \\
    \textcolor{red}{5} & \textcolor{red}{2} & \textcolor{red}{3} & \textcolor{red}{6} \\
    \textcolor{green}{5} & \textcolor{green}{2} & \textcolor{green}{3} & \textcolor{green}{5}
\end{bmatrix}
$$


$$
det(M_{2}) = det(M_{1}) * -1 = (det(M) * -1) * -1 = det(M) = 8
$$

```python
# Row Swapping: 2 positions
# Swapping row 0 with row 1.
# Swapping row 2 with row 3.
# |M| * -1 * -1
M1 = M.copy()
M1[[1, 0]] = M1[[0, 1]]
M1[[3, 2]] = M1[[2, 3]]
print(f"{np.linalg.det(M1)}"
```
Output:
```bash
8.0
```

### Row Scaling

Scaling one row of a matrix by a scalar, scales the determinant of the matrix by the same scalar.

$$
r_{0} \rightarrow k*r_{0} \\
det(A) = k * det(M)
$$

$$
M = \begin{bmatrix}
    \textcolor{red}{3} & \textcolor{red}{4} & \textcolor{red}{5} & \textcolor{red}{1} \\
    1 & 2 & 3 & 2 \\
    5 & 2 & 3 & 5 \\
    5 & 2 & 3 & 6
\end{bmatrix} \xrightarrow{}
A = \begin{bmatrix}
    \textcolor{red}{3k} & \textcolor{red}{4k} & \textcolor{red}{5k} & \textcolor{red}{k} \\
    1 & 2 & 3 & 2 \\
    5 & 2 & 3 & 5 \\
    5 & 2 & 3 & 6
\end{bmatrix}
$$

$$
det(A) = 8k
$$

```python
# Row scaling: by k
k = 3
A = M.copy()
A[0] = k * A[0]
print(A)
det_A = np.linalg.det(A)
print(f"{det_A = } is {k} times {det_M = }")
```
Output:
```bash
[[ 9. 12. 15.  3.]
 [ 1.  2.  3.  2.]
 [ 5.  2.  3.  5.]
 [ 5.  2.  3.  6.]]
det_A = 24.0 is 3 times det_M = 8.0
```


### Row Addition

The adition of a row with another row scaled by a scalar, does not affect the determinant of the matrix.

$$
r_{0} \rightarrow k_{1}r_{1} + k_{2}r_{2} + ... \\
r_0 \rightarrow \sum_{i=1}^{n} k_i r_i
$$

Where:
- $r_0$ is the original row.
- $r_i$ are the rows to be added to $r_0$ with coefficients $k_i$
- $k_i$ are the coefficients of the rows $r_i$, where $i = 1, 2, ..., n$
- $n$ is the total number of rows.

And the equation for the determinant remains the same:

$$
\text{det}(A) = \text{det}(M)
$$

```python
# Row addition:
A = M.copy()
A[0] = A[0] + 2*A[1] + 3*A[2]
print(A)
det_A = np.linalg.det(A)
print(f"{det_A = } is the same as {det_M = }")
```
Output:
```bash
[[20. 14. 20. 20.]
 [ 1.  2.  3.  2.]
 [ 5.  2.  3.  5.]
 [ 5.  2.  3.  6.]]
det_A = 8.0 is the same as det_M = 8.0
```
