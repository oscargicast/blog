---
title: "Decorators in Python"
description: "Templates for decorators in Python"
publishDate: "12 May 2024"
tags: ["python", "decorators", "Higher-order function", "inner functions"]
---

## The boilerplate without parameters
A decorator is a higher-order function that takes a function and returns a new function. It is used to modify the behavior of a function or a method. Decorators are used to add functionality to an existing function without modifying its structure.

This is the pattern used by decorators in Python. The `@decorator` syntax is just a shorthand for calling `decorator` with the decorated function as an argument.

```python
import functools

def decorator(func):
    @functools.wraps(func)  # Preserve info about the original function.
    def wrapper(*args, **kwargs):
        # Do something before.
        value = func(*args, **kwargs)
        # Do something after.
        return value
    return wrapper
```

😶‍🌫️ Without the decorator sugar:
  - This way of decorating may not seem inmediately useful, but it is useful when applied to functions that you don't call directly yourself.
```python {4}
def sum_a_b(a: int, b: int) -> int:
  return a + b

decorator(my_func)(a=2, b=3)
```

🍭 With the decorator syntax:
```python ins={1} {5}
@decorator
def sum_a_b(a: int, b: int) -> int:
  return a + b

my_func(a=2, b=3)
```

## The boilerplate with parameters 🍭
This is the more generic use case for decorators.

- If you’ve called `@decorator_handler` **without arguments**, then the decorated function will be passed in as _func.
- If you’ve called it **with arguments**, then _func will be None, and some of the keyword arguments may have been changed from their default values.
- The asterisk (`*`) in the argument list means that you can’t call the remaining arguments as positional arguments.
- `_func` is a positional argument.

```python
import functools

def decorator_handler(_func=None, *, arg1=None, arg2=None):
    def decorator(func):
      @functools.wraps(func)
      def wrapper(*args, **kwargs):
          # Do something before.
          # Use arg1, arg2, or more...
          value = func(*args, **kwargs)
          # Do something after.
          return value
      return wrapper

    if _func is None:  # Decorated func WITH arguments.
        # @decorator_handler(repeat=2)
        return decorator
    else:  # Decorated func WITHOUT arguments.
        # @decorator_handler
        return decorator(_func)
```

### Example
```python
import functools

def decorator_handler(_func=None, *, repeat=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print(f"\n{func.__name__}; {repeat = }; {_func = }")
            for _ in range(repeat):
                value = func(*args, **kwargs)
                print(value)
            return value
        return wrapper

    if _func is None:  # Decorated func without arguments.
        return decorator
    else:  # Decorated func with arguments.
        return decorator(_func)

def echo(s: str) -> str:
    return f"echo: {s} {s}"

@decorator_handler  # _func decorated_echo_none
def decorated_echo_none(s: str) -> str:
    return echo(s)

@decorator_handler() # _func None
def decorated_echo_1(s: str) -> str:
    return echo(s)

@decorator_handler(repeat=2) # _func None
def decorated_echo_2(s: str) -> str:
    return echo(s)


if __name__ == "__main__":
    # Decorating explicitly the echo function:
    # @decorator_handler
    decorator_handler(echo)("hola")
    # @decorator_handler()
    decorator_handler()(echo)("hola")
    # @decorator_handler(repeat=2)
    decorator_handler(repeat=2)(echo)("hola")

    # Calling decorated functions:
    # @decorator_handler
    decorated_echo_none("bye")
    # @decorator_handler()
    decorated_echo_1("bye")
    # @decorator_handler(repeat=2)
    decorated_echo_2("bye")
```

Output:
```python
echo; repeat = 1; _func = <function echo at 0x1041f6660>
echo: hola hola

echo; repeat = 1; _func = None
echo: hola hola

echo; repeat = 2; _func = None
echo: hola hola
echo: hola hola

decorated_echo_none; repeat = 1; _func = <function decorated_echo_none at 0x1041f7380>
echo: bye bye

decorated_echo_1; repeat = 1; _func = None
echo: bye bye

decorated_echo_2; repeat = 2; _func = None
echo: bye bye
echo: bye bye
```

## Measuring time

Given the following problem:
> Write a function format_number that takes a non-negative number as its only parameter. Your function should convert the number to a string and add commas as a thousand separators. For example, calling format number(1000000) should return "1,000,000"

Implement a HOF that measures the time performance and run a profiler to check the performance of the function:
```python title="decorators.py"
import functools
import time
import cProfile


def performance(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """Wrapper function"""
        func_case = kwargs.get("func_case")
        print(f"{50*'='} Performance Profile: {func_case} {50*'='}")
        start = time.perf_counter()
        result = func(*args, **kwargs)
        cProfile.run(f"{func(*args, **kwargs)}")
        end = time.perf_counter()
        elapsed = end - start
        print(f"Time performance: {elapsed:.5f} seconds")
        print(f"{50*'='} End Perfor. Profile: {func_case} {50*'='}\n")
        return result
    return wrapper
```

Solving the problem:
```python title="main.py"
@performance
def format_number(number: int) -> str:
    """2s approach: backwards."""
    result = []
    number_list = list(str(number))
    count = 0
    for item in reversed(number_list):
        if count == GROUP_LENGTH:
            count = 0
            result.append(",")
        result.append(item)
        count += 1
    return "".join(reversed(result))
```

Adding tests:
```python title="test.py"
from main import format_number

def test_default_format():
    assert format_number(100000000) == "100,000,000"
    assert format_number(10000000) == "10,000,000"
    assert format_number(1000000) == "1,000,000"
    assert format_number(1000) == "1,000"
    assert format_number(100) == "100"
```

## Slowing down code

```python title="decorators.py"
import functools
import time

def slow_down(func):
    """Sleep 1 second before calling the function"""
    @functools.wraps(func)
    def wrapper_slow_down(*args, **kwargs):
        time.sleep(1)
        return func(*args, **kwargs)
    return wrapper_slow_down

@slow_down
def countdown(from_number):
    if from_number < 1:
        print("Done!")
    else:
        print(from_number)
        countdown(from_number - 1)
```
Output:
```python
>>> countdown(3)
3
2
1
Done!
```

## Registering Plugins

Decorator:
```python title="decorators.py"
PLUGINS = dict()

def register(func):
    """Register a function as a plug-in"""
    PLUGINS[func.__name__] = func
    return func
```

Main:
```python title="main.py"
from decorators import register, PLUGINS

@register
def say_hello(name):
    return f"Hello {name}"

@register
def be_awesome(name):
    return f"Yo {name}, together we're the awesomest!"
```

Output:
```python
>>> PLUGINS
{'say_hello': <function say_hello at 0x7f768eae6730>,
 'be_awesome': <function be_awesome at 0x7f768eae67b8>}
```
