{
  description = "Personal Website of Edmund Miller";

  outputs = {
    self,
    nixpkgs,
  }: {
    devShell.x86_64-linux = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
      pkgs.mkShell {
        buildInputs = with pkgs; [
          openring
        ];
      };
  };
}
