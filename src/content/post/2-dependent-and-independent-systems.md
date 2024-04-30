---
title: "Dependent and Independent Linear Systems"
description: "Determine a linear system's dependency and independence"
publishDate: "01 May 2024"
tags: ["linear systems", "matrix", "determinant", "numpy"]
---

## Dependent and Independent Systems

$$
\begin{array}{cccc} % cccc specifies that there are four centered columns
    % First Matrix
    \begin{bmatrix}
        1 & 0 & 1 \\
        0 & 1 & 0 \\
        3 & 2 & 3
    \end{bmatrix}
    &
    % Second Matrix
    \begin{bmatrix}
        1 & 1 & 1 \\
        1 & 1 & 2 \\
        0 & 0 & -1
    \end{bmatrix}
    &
    % Third Matrix
    \begin{bmatrix}
        1 & 1 & 1 \\
        0 & 2 & 2 \\
        0 & 0 & 3
    \end{bmatrix}
    &
    % Fourth Matrix
    \begin{bmatrix}
        1 & 2 & 5 \\
        0 & 3 & -2 \\
        2 & 4 & 10
    \end{bmatrix} \\ \\
    % Titles
    3r{1} + 2r_{2} = r_{3} & r{1} - r_{2} = r_{3} & \textbf{No relation} & 2r_{1} = r_{3} \\
    \text{Dependent} & \text{Dependent} & \text{Independent} & \text{Dependent} \\
    \text{Singular} & \text{Singular} & \text{Non Singular} & \text{Singular} \\
\end{array}
$$

> **Singular**: Infinite or No solutions.

> **Singular**: Redundant or Contradictory.

> **Non Singular**: Unique solution / Complete system.

- The $$\det(A) = 0$$ for **Singular Systems**.
- The $$\det(A) \ne 0$$ for **NON Singular Systems**.

### The Upper triangular matrix
$$
U =
\begin{pmatrix}
    \textcolor{magenta}{a_{11}} & a_{12} & a_{13} & \cdots & a_{1n} \\
    0 & \textcolor{magenta}{a_{22}} & a_{23} & \cdots & a_{2n} \\
    0 & 0 & \textcolor{magenta}{a_{33}} & \cdots & a_{3n} \\
    \vdots & \vdots & \vdots & \ddots & \vdots \\
    0 & 0 & 0 & \cdots & \textcolor{magenta}{a_{nn}}
\end{pmatrix}
$$

Its determinant is defined as the product of its diagonal elements.

$$
\det(U) =
\begin{vmatrix}
    \textcolor{magenta}{a_{11}} & a_{12} & a_{13} & \cdots & a_{1n} \\
    0 & \textcolor{magenta}{a_{22}} & a_{23} & \cdots & a_{2n} \\
    0 & 0 & \textcolor{magenta}{a_{33}} & \cdots & a_{3n} \\
    \vdots & \vdots & \vdots & \ddots & \vdots \\
    0 & 0 & 0 & \cdots & \textcolor{magenta}{a_{nn}}
\end{vmatrix}
=
a_{11} \cdot a_{22} \cdot a_{33} \cdot \ldots \cdot a_{nn} = \prod_{i=1}^{n} a_{ii}
$$

> For the lower triangular matrix, the determinant is the same as the upper triangular matrix.

## In numpy

### A Non Singular (Complete) System

$$
\begin{equation}
  \left\{
    \begin{array}{rcl}
      -x_{1} + 3x_{2} & = & 7 \\
      3x_{1} + 2x_{2} & = & 1
    \end{array}
  \right.
\end{equation}
$$

$$
A =
\begin{bmatrix}
    -1 & 3 \\
    3 & 2
\end{bmatrix}
,
b =
\begin{bmatrix}
    7 \\
    1
\end{bmatrix}
$$


```python title="solve.py"
A = np.array([
    [-1, 3],
    [3, 2]
], dtype=np.dtype(float))
b = np.array([7, 1], dtype=np.dtype(float))
x = np.linalg.solve(A, b)
```

Output (Only has one solution):
```bash title="Solution"
[-1.  2.]
```

> `np.linalg` is a numpy module related to linear algebra and matrix operations.

The matrix $A$ is non-singular because its determinant is not zero.
$$
 \det(A) = -1 \cdot 2 - 3 \cdot 3 = -2 - 9 = -11 \ne 0
$$

```python
det_A = np.linalg.det(A)
print(f"Determinant of matrix A: {d:.2f}")
```
Output:
```bash
Determinant of matrix A: -11.00
```
