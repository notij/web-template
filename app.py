import flask
from flask import send_from_directory
import os

app = flask.Flask(__name__)
app.config['CSS_FOLDER'] = os.path.join('static', 'styles')
app.config["SCRIPT_FOLDER"] = os.path.join('static', 'scripts')
app.config["COMPONENT_FOLDER"] = os.path.join('static', 'templates', 'components')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

def get_template():
    template_css = os.path.join(app.config['CSS_FOLDER'], 'template.css')
    template_js = os.path.join(app.config["SCRIPT_FOLDER"], 'template.js')
    template_page = 'template.html'
    return (template_page, template_css, template_js)

@app.route("/",methods=['GET'])
@app.route("/index",methods=['GET'])
def index():
    (template_page, template_css, template_js) = get_template()
    main_content =  flask.render_template("/components/index.html")
    css = os.path.join(app.config['CSS_FOLDER'], 'index.css')
    js = os.path.join(app.config["SCRIPT_FOLDER"], 'index.js')
    # top-nav's height of the scroll effect in pixels 
    scroll_effect_height = 100;
    return flask.render_template(template_page, template_style=template_css, template_script=template_js,
                                 scroll_effect_height = scroll_effect_height,
                                 main_content=main_content, index_style=css, index_script=js)


if __name__ == '__main__':
    app.debug=True
    app.run()