{
  description = "Personal Website of Edmund Miller";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    emacs-overlay.url = "github:nix-community/emacs-overlay";
  };

  outputs = {
    self,
    nixpkgs,
    emacs-overlay,
  }: {
    devShell.x86_64-linux = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      scripts = with pkgs; [
        (writeScriptBin "clean" ''
          rm -rf dist
        '')

        (writeScriptBin "my-openring" ''
          ${pkgs.openring}/bin/openring \
          -s https://drewdevault.com/feed.xml \
          -s https://monimiller.com/feed.xml \
          -s https://taehoonkim.org/news/?format=rss \
          < src/misc/openring.html \
          > src/misc/openring-out.html
        '')
      ];
    in
      pkgs.mkShell {
        buildInputs = with pkgs;
          [
            openring
            emacs-overlay.packages.${system}.emacs-unstable-pgtk
          ]
          ++ scripts;
      };
  };
}
