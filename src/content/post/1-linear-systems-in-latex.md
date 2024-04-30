---
title: "Linear systems in Latex"
description: "How to write a linear system and matrix using Latex"
publishDate: "30 April 2024"
tags: ["linear systems", "latex"]
---

## Define a single equation

To represent and inline equation like this: $$a + b + c = 10$$, use the following syntax:
```latex
$$a + b + c = 10$$
```

But if we want to define an equation in a linear system like this:

$$
\begin{equation}
a + b + c = 10
\end{equation}
$$

```latex
\begin{equation}
a + b + c = 10
\end{equation}
```

## More than one equation
**In separate systems:**

$$
\begin{align}
a + b &= 10 \\
a + 2b &= 12
\end{align}
$$

```latex
\begin{align}
a + b &= 10 \\
a + 2b &= 12
\end{align}
```

**In the same system:**

<div id="eq:linear-system">
$$
\begin{equation}
  \left\{
    \begin{array}{rcl}
      a + b & = & 10 \\
      a + 2b & = & 12
    \end{array}
  \right.
\end{equation}
$$
</div>

```latex title="system.tex"
\begin{equation}
  \left{
    \begin{array}{rcl}
      a + b & = & 10 \\
      a + 2b & = & 12
    \end{array}
  \right
  \label{eq:system}
\end{equation}
```

> The `&` is used for alignment.

## In matrix form

[This system of equations](#eq:my-equation) can be expressed in matrix form as follows:

$$
\begin{bmatrix}
  1 & 1 \\
  1 & 2
\end{bmatrix}

\begin{bmatrix}
  a \\
  b
\end{bmatrix}

=

\begin{bmatrix}
  10 \\
  12
\end{bmatrix}
$$

```latex title="matrix.tex"
\begin{bmatrix}
  1 & 1 \\
  1 & 2
\end{bmatrix}

\begin{bmatrix}
  a \\
  b
\end{bmatrix}

=

\begin{bmatrix}
  10 \\
  12
\end{bmatrix}
```
