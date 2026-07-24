{
  description = "Development environment for edmundmiller.dev";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
    flake-parts.url = "github:hercules-ci/flake-parts";
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    treefmt-nix.inputs.nixpkgs.follows = "nixpkgs";
    devenv-root = {
      url = "file+file:///dev/null";
      flake = false;
    };
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
        inputs.treefmt-nix.flakeModule
      ];
      systems = ["x86_64-linux" "i686-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin"];

      perSystem = {pkgs, ...}: {
        devenv.shells.default = {
          name = "edmundmiller-dev";
          devenv.root = pkgs.lib.mkOverride 999 (builtins.toString ./.);
          devenv.dotfile = let
            devenvRoot = builtins.readFile inputs.devenv-root.outPath;
          in
            pkgs.lib.mkIf (devenvRoot == "") (pkgs.lib.mkOverride 999 "/tmp/edmundmiller-dev");
          languages.javascript = {
            enable = true;
            package = pkgs.nodejs_24;
            lsp.enable = false;
            pnpm = {
              enable = true;
              package = pkgs.pnpm_11.override {nodejs = pkgs.nodejs_24;};
            };
          };

          packages = [pkgs.openring];
        };

        treefmt = {
          projectRootFile = "flake.nix";
          programs.alejandra.enable = true;
          programs.deadnix.enable = true;
          programs.oxfmt.enable = true;
          programs.oxfmt.excludes = ["src/content/post/lcep.md"];
        };
      };
    };
}
