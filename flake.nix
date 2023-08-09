{
  description = "Personal Website of Edmund Miller";

  outputs = {
    self,
    nixpkgs,
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
          ]
          ++ scripts;
      };
  };
}
