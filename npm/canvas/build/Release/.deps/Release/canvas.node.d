cmd_Release/canvas.node := c++ -bundle -undefined dynamic_lookup -Wl,-no_pie -Wl,-search_paths_first -mmacosx-version-min=10.10 -arch x86_64 -L./Release -stdlib=libc++  -o Release/canvas.node Release/obj.target/canvas/src/backend/Backend.o Release/obj.target/canvas/src/backend/ImageBackend.o Release/obj.target/canvas/src/backend/PdfBackend.o Release/obj.target/canvas/src/backend/SvgBackend.o Release/obj.target/canvas/src/bmp/BMPParser.o Release/obj.target/canvas/src/Backends.o Release/obj.target/canvas/src/Canvas.o Release/obj.target/canvas/src/CanvasGradient.o Release/obj.target/canvas/src/CanvasPattern.o Release/obj.target/canvas/src/CanvasRenderingContext2d.o Release/obj.target/canvas/src/closure.o Release/obj.target/canvas/src/color.o Release/obj.target/canvas/src/Image.o Release/obj.target/canvas/src/ImageData.o Release/obj.target/canvas/src/init.o Release/obj.target/canvas/src/register_font.o -L/usr/local/Cellar/pixman/0.38.4/lib -lpixman-1 -L/usr/local/Cellar/cairo/1.16.0_2/lib -lcairo -L/usr/local/Cellar/libpng/1.6.37/lib -lpng16 -lz -L/usr/local/Cellar/pango/1.44.7/lib -L/usr/local/Cellar/glib/2.62.3/lib -L/usr/local/opt/gettext/lib -L/usr/local/Cellar/harfbuzz/2.6.4/lib -lpangocairo-1.0 -lpango-1.0 -lgobject-2.0 -lglib-2.0 -lintl -lharfbuzz -L/usr/local/opt/freetype/lib -lfreetype -L/usr/local/Cellar/librsvg/2.46.4/lib -L/usr/local/Cellar/gdk-pixbuf/2.40.0/lib -lrsvg-2 -lm -lgio-2.0 -lgdk_pixbuf-2.0 -ljpeg -lgif
