# Compatibility shim for running older Jekyll/Liquid on Ruby 4 locally.
# GitHub Pages runs its own supported Ruby/Jekyll stack, so this is only for preview.
unless Object.method_defined?(:tainted?)
  class Object
    def tainted?
      false
    end
  end
end
