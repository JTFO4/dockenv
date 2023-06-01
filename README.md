# Dockenv

Dockenv is a command-line tool for converting .NET user secrets JSON files to .env files for use with Docker. It simplifies the process of setting up environment variables in Docker containers when working with .NET projects.

## Features

- Converts .NET user secrets JSON files to .env files
- Customizable output paths
- Automatically handles nested JSON objects and converts keys to the appropriate format
- Supports base64 encoding of values for use with k8s secrets

## Installation

To install Dockenv globally on your machine, first clone the repo:

```shell
git clone https://github.com/JTFO4/dockenv.git
```

Then, navigate to the project directory and run the following command:

```shell
npm install -g
```

## Usage

---

**Typical Usage**

A .NET project located at: `~/projects/my-project`

Targeting an output located at: `~/projects/my-project/secrets.env`

The command would be:

```shell
dotnet user-secrets list --project ~/projects/my-project | dockenv -o ~/projects/my-project/secrets.env
```

---

**Using the default output path**

A .NET project located at: `~/projects/my-project`

Targeting the default output: `secrets.env` (in the current working directory)

The command would be:

```shell
dotnet user-secrets list --project ~/projects/my-project | dockenv
```

---

**Generating base64-encoded values**

A .NET project located at: `~/projects/my-project`

Targeting an output located at: `~/projects/my-project/secrets.env`

The command would be:

```shell
dotnet user-secrets list --project ~/projects/my-project | dockenv -o ~/projects/my-project/secrets.env -b64
```

---

**Overwriting an existing .env file**

A .NET project located at: `~/projects/my-project`

Targeting an (already existing) output located at: `~/projects/my-project/secrets.env`

The command would be:

```shell
dotnet user-secrets list --project ~/projects/my-project | dockenv -o ~/projects/my-project/secrets.env -f
```

## Contributing

---
If you'd like to contribute to the project, feel free to submit a pull request on the GitHub repository.


## License

---

This project is licensed under the MIT License.
