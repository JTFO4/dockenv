# Dockenv

Dockenv is a command-line tool for converting .NET user secrets JSON files to .env files for use with Docker. It simplifies the process of setting up environment variables in Docker containers when working with .NET projects.

## Features

- Converts .NET user secrets JSON files to .env files
- Customizable output paths
- Automatically handles nested JSON objects and converts keys to the appropriate format
- Prompts for overwriting existing files

## Installation

To install Dockenv globally on your machine, first clone the repo:

```shell
git clone https://github.com/JTFO4/dockenv.git
```

Then, navigate to the project directory and run the following command:

```shell
npm install -g dockenv
```



## Usage

To convert a .NET user secrets JSON file to a .env file, use the following command:

```shell
dockenv -i <input_file> [-o <output_file>]
```

- `<input_file>`: Path to the .NET user secrets JSON file.
- `<output_file>` (optional): Path to the output .env file. If not specified, the tool will create a .env file in the same directory as the input file with the same name.

### Examples

1. Convert `example.json` to `example.env` in the same directory:
  
    ```shell
    dockenv -i example/example.json
    ```
   
2. Convert `example.json` to a custom output path:
    ```shell
    dockenv -i example/example.json -o custom/path/example.env
    ```

## Contributing

If you'd like to contribute to the project, feel free to submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License.
