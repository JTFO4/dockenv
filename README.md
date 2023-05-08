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
dotnet user-secrets list --project path/to/your/dotnet/project | dockenv -o <output_file>
```

- `<output_file>` (optional): Path to the output .env file. If not specified, the tool will create a .env file in the same directory as the input file with the same name.

**For example:**

A .NET project located at: `~/projects/my-project`

Targeting an output located at: `~/projects/my-project/secrets.env`

The command would be:

```shell
dotnet user-secrets list --project ~/projects/my-project | dockenv -o ~/projects/my-project/secrets.env
```

## Contributing

If you'd like to contribute to the project, feel free to submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License.
